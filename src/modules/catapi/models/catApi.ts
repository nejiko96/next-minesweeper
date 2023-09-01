type CatCategoryType = {
  id: number
  name: string
}

type SearchCatImageType = {
  breeds: string[]
  categories: CatCategoryType[]
  id: string
  url: string
  width: number
  height: number
}

export const fetchCatImage = async (): Promise<SearchCatImageType> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  const result = await res.json()
  return result[0]
}
