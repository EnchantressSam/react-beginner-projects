import React from 'react'
import './index.scss'
import { Collection } from './Collection'

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  //запрос данных при первом рендере и сохранем ее в state

  const [categoryId, setCategoryId] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [collections, setCollections] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''

    fetch(
      `https://64106f93be7258e14529cb77.mockapi.io/photos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json)
      })
      .catch((err) => {
        console.warn(err)
        alert('not data')
      })
      .finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {/* <li className="active">Все</li> */}
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        {/*  контролируемый инпут<input className="search-input" placeholder="Поиск по названию" /> */}
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {/* отрендерили  */}
        {isLoading ? (
          <h2>loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
        {/* <li>1</li>
        <li className="active">2</li>
        <li>3</li> */}
      </ul>
    </div>
  )
}

export default App
