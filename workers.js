addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // 根据仓库和路径替换Github Api url
    const githubResponse = await fetch('https://api.github.com/repos/ScaredCube/RandomImage/contents/imgs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
      },
    });

    const images = await githubResponse.json();
    const randomImage = getRandomImage(images);
    const imageUrl = randomImage.download_url;
    const imageResponse = await fetch(imageUrl);

    return new Response(imageResponse.body, {
      status: imageResponse.status,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

function getRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
