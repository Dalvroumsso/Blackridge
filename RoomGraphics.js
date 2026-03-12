function RoomGraphics({ roomId, npcs = [], onNpcClick }) {
  // 1. On définit le chemin de ton image "En développement"
  const IMAGE_DEV = "images/en_developpement.png";

  const roomBackgrounds = {
    entrance: "images/entrance.png",
    cell: "images/cell.png",
    corridor: "images/corridor.png",
    canteen: "images/canteen.png",
    common: "images/common.png",
    yard: "images/yard.png",
    offices: "images/offices.png",
    security: "images/security.png",
    infirmary: "images/infirmary.png",
    visiting_room: "images/visiting_room.png",
    solitary: "images/solitary.png"
  };

  return React.createElement(
    "div",
    { className: "relative w-full h-80 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl bg-gray-900" },
    
    // --- DÉCOR DE FOND ---
    React.createElement("img", {
      // Si la salle n'est pas dans la liste, on met l'image DEV
      src: roomBackgrounds[roomId] || IMAGE_DEV, 
      className: "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
      alt: `Vue de ${roomId}`,
      // Si le fichier est listé mais n'existe pas physiquement sur le disque
      onError: (e) => { e.target.src = IMAGE_DEV; }
    }),

    // --- PNJs ---
    npcs.map((npc, i) =>
      React.createElement("div", {
        key: npc.id || i,
        className: "absolute group cursor-pointer transition-all active:scale-95",
        style: { 
          top: npc.y || "50%", 
          left: npc.x || "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10
        },
        onClick: () => onNpcClick && onNpcClick(npc)
      }, 
      
      // Étiquette contextuelle
      React.createElement("span", {
        className: "absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-gray-600 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-bold"
      }, npc.type === "trade" ? `🛒 TROQUER : ${npc.name}` : `💀 COMBATTRE : ${npc.name}`),

      // IMAGE DU PNJ
      React.createElement("img", {
        // On cherche l'image. Si npc.image n'existe pas, on tente l'id, sinon DEV
        src: npc.image || `images/npcs/${npc.id}.png`, 
        className: "w-16 h-24 object-contain hover:brightness-125 hover:scale-110 transition-all",
        // Sécurité si le fichier .png du PNJ est introuvable
        onError: (e) => { e.target.src = IMAGE_DEV; }
      }),

      // Nom au survol
      React.createElement("span", {
        className: "absolute -bottom-6 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold bg-black/50 px-2 rounded opacity-0 group-hover:opacity-100"
      }, npc.name)
    ))
  );
}
