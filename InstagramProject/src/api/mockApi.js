export const fetchProfileData = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          profile: {
            username: username,
            password: password,
            bio: "Photographer & traveler.",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            followers: 1200,
            following: 180,
          },
          posts: [
            { imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
            { imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
            { imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
            { imageUrl: "https://randomuser.me/api/portraits/men/4.jpg" },
            { imageUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
            { imageUrl: "https://randomuser.me/api/portraits/men/10.jpg" }
          ]
        });
      }, 1000); // Simula un retraso de 1 segundo para la respuesta
    });
  };