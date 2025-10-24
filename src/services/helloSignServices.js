
export async function requestSignature({ signerEmail, signerName, fileUrl, title, comment }) {
  if (!fileUrl || !signerEmail || !signerName) {
    throw new Error("Missing required parameters");
  }

  const res = await fetch(
    "https://mughbbnyrizlbhnwypqb.supabase.co/functions/v1/send-signature",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signerEmail,
        signerName,
        fileUrl,
        title,
        comment,
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to send signature request");
  }

  return await res.json();
}
