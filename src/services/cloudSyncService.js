import CryptoJS from 'crypto-js';

// Base URL de JSONBin-Zeta para almacenamiento JSON público y anónimo
const JSONBIN_ZETA_URL = 'https://jsonbin-zeta.vercel.app/api/bins';

// Clave secreta base para derivar contraseñas de cifrado
const SYNC_SALT = 'ASCK_CRM_SALT_2026_!';

export const cloudSyncService = {
  // Generar un ID de Sala en la nube (Creando un nuevo bin)
  async generateRoomId() {
    try {
      const res = await fetch(JSONBIN_ZETA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clients: [],
          tasks: [],
          notes: [],
          activities: [],
          agendaEvents: [],
          sprints: [],
          updatedAt: new Date(0).toISOString()
        })
      });
      if (!res.ok) throw new Error("Fallo al crear bin en la nube");
      const data = await res.json();
      return data.id;
    } catch (err) {
      console.error("[CloudSync] Error generando sala:", err);
      // Fallback
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = 'ASCK-';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  },

  // Derivar el ID del bin y la clave de cifrado a partir del Room ID
  _getSyncConfig(roomId) {
    const cleanId = roomId.trim();
    // La clave de cifrado simétrico AES
    const encryptionKey = cleanId + SYNC_SALT;
    // Map ASCK-MASTER-SYNC to our registered master bin, else use cleanId directly
    const binId = cleanId === 'ASCK-MASTER-SYNC' ? 'H4SKQ8Y_x5' : cleanId;
    return { binId, encryptionKey };
  },

  // Cifrar datos localmente antes de subirlos a la nube
  _encryptData(data, encryptionKey) {
    const jsonStr = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonStr, encryptionKey).toString();
  },

  // Descifrar datos descargados de la nube
  _decryptData(ciphertext, encryptionKey) {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedStr);
    } catch (e) {
      console.error("Error al descifrar los datos de la sala:", e);
      return null;
    }
  },

  // Obtener los datos actuales de la nube para una Sala
  async fetchFromCloud(roomId) {
    const { binId, encryptionKey } = this._getSyncConfig(roomId);
    const url = `${JSONBIN_ZETA_URL}/${binId}`;

    try {
      const res = await fetch(url);
      if (res.status === 404) {
        // La sala no tiene datos guardados todavía
        return null;
      }
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const resultJson = await res.json();
      const data = resultJson.data;
      if (typeof data === 'string') {
        return this._decryptData(data, encryptionKey);
      }
      return data;
    } catch (err) {
      console.error("[CloudSync] Error al descargar de la nube:", err);
      throw err;
    }
  },

  // Subir datos locales a la nube cifrándolos primero
  async uploadToCloud(roomId, payload) {
    const { binId, encryptionKey } = this._getSyncConfig(roomId);
    const url = `${JSONBIN_ZETA_URL}/${binId}`;

    // Añadir timestamp de actualización
    const payloadWithTime = {
      ...payload,
      updatedAt: new Date().toISOString()
    };

    const ciphertext = this._encryptData(payloadWithTime, encryptionKey);

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: ciphertext })
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return payloadWithTime;
    } catch (err) {
      console.error("[CloudSync] Error al subir a la nube:", err);
      throw err;
    }
  },

  // Realizar la sincronización completa (Pull & Push con resolución de conflictos por timestamp)
  async sync(roomId, localData) {
    if (!roomId) return localData;

    try {
      const cloudData = await this.fetchFromCloud(roomId);

      if (!cloudData) {
        // La nube está vacía, subimos nuestro estado local completo
        console.log("[CloudSync] Inicializando sala en la nube con datos locales...");
        const uploaded = await this.uploadToCloud(roomId, localData);
        return uploaded;
      }

      // Comparación de marcas de tiempo para resolver conflictos
      const localTime = new Date(localData.updatedAt || 0).getTime();
      const cloudTime = new Date(cloudData.updatedAt || 0).getTime();

      if (localTime > cloudTime) {
        // Los datos locales son más nuevos, subimos a la nube
        console.log("[CloudSync] Subiendo cambios locales más recientes a la nube...");
        const uploaded = await this.uploadToCloud(roomId, localData);
        return uploaded;
      } else if (cloudTime > localTime) {
        // Los datos de la nube son más nuevos, actualizamos localmente
        console.log("[CloudSync] Descargando cambios más recientes desde la nube...");
        return cloudData;
      } else {
        // Ya están en perfecta sincronía
        console.log("[CloudSync] Datos perfectamente sincronizados.");
        return cloudData;
      }
    } catch (err) {
      console.error("[CloudSync] Sincronización fallida, usando datos locales:", err);
      return localData;
    }
  }
};
