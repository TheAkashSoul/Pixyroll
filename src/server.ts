const apiKey = process.env.NEXT_PUBLIC_IMAGE_API;

export async function fetchImages(pageParam: number, search: string) {
  const perPage = 45;
  const url = `https://api.unsplash.com/search/photos?page=${
    pageParam || 1
  }&per_page=${perPage}&query=${search || "nature"}&client_id=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }
  return response.json();
}
