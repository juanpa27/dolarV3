import html2canvas from "html2canvas";

export const useShareCard = () => {
  const handleShare = async (elementId: string, title: string) => {
    const cardElement = document.getElementById(elementId);

    if (!cardElement) return;

    try {
      // Usa html2canvas para capturar la card como imagen
      const canvas = await html2canvas(cardElement);
      const dataUrl = canvas.toDataURL("image/png");

      // Si el navegador soporta la API de compartir
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const filesArray = [new File([blob], "card-image.png", { type: "image/png" })];
        await navigator.share({
          title,
          files: filesArray,
        });
      } else {
        // Fallback en caso de que `navigator.share` no esté disponible
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `cotizacion-${title}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  return { handleShare };
};
