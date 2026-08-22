import type { Commit } from "vuex";
import { confirmFile, initFile, uploadFileBytes } from "../../api/common/file/post";
import type { FileDirectory, FileType } from "../../api/common/file/types";
import { notifyError } from "./notify";

export interface FileUploadParams {
  directory: FileDirectory;
  file_type: FileType;
}

/** Pełny handshake: init pliku -> wgranie bajtów -> potwierdzenie. Zwraca file_id albo null (sama zgłasza błąd). */
export async function uploadFileHandshake(
  commit: Commit,
  file: File,
  params: FileUploadParams
): Promise<string | null> {
  const initResult = await initFile({
    original_name: file.name,
    size: file.size,
    directory: params.directory,
    file_type: params.file_type,
    mime_type: file.type || null,
  });
  if (initResult.status === "ERROR" || !initResult.data) {
    notifyError(
      commit,
      initResult.status === "ERROR" ? initResult.data.message : "Nie udało się zainicjować uploadu."
    );
    return null;
  }

  const fileId = initResult.data.file_id;
  const uploadResult = await uploadFileBytes(fileId, file);
  if (uploadResult.status === "ERROR") {
    notifyError(commit, uploadResult.data.message);
    return null;
  }

  const confirmResult = await confirmFile(fileId);
  if (confirmResult.status === "ERROR") {
    notifyError(commit, confirmResult.data.message);
    return null;
  }

  return fileId;
}
