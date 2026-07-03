class SignatureUploadError extends Error {
  constructor(message = "Failed to upload signature") {
    super(message);
    this.name = "SignatureUploadError";
  }
}

export const signatureApi = {
  async upload(signatureData: string): Promise<string> {
    let response: Response;

    try {
      response = await fetch("/api/signature/upload", {
        body: JSON.stringify({ signature: signatureData }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    } catch {
      throw new SignatureUploadError();
    }

    if (!response.ok) {
      throw new SignatureUploadError();
    }

    let data: unknown;

    try {
      data = await response.json();
    } catch {
      throw new SignatureUploadError("Invalid response from server");
    }

    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new SignatureUploadError("Invalid response from server");
    }

    const { url } = data as Record<string, unknown>;

    if (typeof url !== "string" || url.length === 0) {
      throw new SignatureUploadError("Invalid response from server");
    }

    return url;
  },
};

export { SignatureUploadError };
