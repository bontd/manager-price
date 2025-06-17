/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_DOMAIN: string;
    readonly VITE_APP_NAME: string;
    // Thêm biến môi trường khác nếu có
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}