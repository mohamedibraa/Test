// async function getPosts() {
//   return fetch("https://jsonplaceholder.typicode.com/users")
//     .then((postsRespond) => {
//       if (!postsRespond) {
//         throw new Error("Failed to fetch posts");
//       }
//       return postsRespond.json();
//     })
//     .then((postsArr) => {
//       renderPosts(postsArr);
//       return "Posts fetched and rendered successfully.";
//     })
//     .catch((error) => {
//       console.error(error);
//       throw new Error("Failed to fetch and render posts.");
//     });
// }

// function renderPosts(postsArr) {
//   const container = document.createElement("div");
//   container.classList.add("button-container");

//   postsArr.forEach((element) => {
//     const button = document.createElement("button");
//     button.textContent = element.username;
//     button.classList.add("button");
//     //
//     // add code that get user posts
//     //
//     container.appendChild(button);
//   });

//   document.body.appendChild(container);
// }

// async function getUserPosts(userId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch user posts");
//   }
//   return response.json();
// }
// getPosts()
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });
async function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((postsRespond) => {
      if (!postsRespond) {
        throw new Error("Failed to fetch posts");
      }
      return postsRespond.json();
    })
    .then(async (postsArr) => {
      renderPosts(postsArr);

      const userPosts = await getUserPosts(1);
      renderUserPosts(userPosts);
      return "Posts fetched successfully.";
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to fetch and render posts.");
    });
}

function renderPosts(postsArr) {
  const container = document.createElement("div");
  container.classList.add("button-container");
  // console.log(postsArr);
  postsArr.forEach((element) => {
    const button = document.createElement("button");
    button.textContent = element.name;
    button.classList.add("button");

    // Add event listener for each button
    button.addEventListener("click", async () => {
      try {
        const userPosts = await getUserPosts(element.id);
        renderUserPosts(userPosts);
      } catch (error) {
        console.error(error);
      }
    });
    //
    container.appendChild(button);
  });

  document.body.appendChild(container);
}

async function getUserPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return response.json();
}

function renderUserPosts(posts) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("user-posts");

  posts.forEach((post) => {
    const postElement = document.createElement("p");
    postElement.textContent = post.title;
    postContainer.appendChild(postElement);
  });

  // Remove
  const existingPostContainer = document.querySelector(".user-posts");
  if (existingPostContainer) {
    existingPostContainer.remove();
  }

  document.body.appendChild(postContainer);
}

getPosts()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error.message);
  });
