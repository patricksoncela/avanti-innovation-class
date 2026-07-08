import { useState } from 'react'
import githubLogo from './assets/github-logo.png'
import githubWord from './assets/github.png'
import searchIcon from './assets/search-icon.png'
import sunIcon from './assets/sun.png'
import moonIcon from './assets/moon.png'

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  async function handleSearch(event) {
    event.preventDefault()

    const search = username.trim()

    if (!search) {
      return
    }

    setLoading(true)
    setError('')
    setUser(null)

    try {
      const response = await fetch(`https://api.github.com/users/${search}`)

      if (!response.ok) {
        throw new Error('not found')
      }

      const data = await response.json()
      setUser(data)
    } catch {
      setError('Nenhum perfil foi encontrado com esse nome de usuÃƒÆ’Ã‚Â¡rio. Tente novamente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={`app ${isLightMode ? 'app--light' : 'app--dark'}`}>
      <button
        className={`theme-toggle ${isLightMode ? 'theme-toggle--light' : 'theme-toggle--dark'}`}
        type="button"
        onClick={() => setIsLightMode(!isLightMode)}
        aria-label="Alternar tema"
        aria-pressed={isLightMode}
      >
        <span className="theme-toggle__track">
          <span className="theme-toggle__thumb">
            <img
              className="theme-toggle__icon"
              src={isLightMode ? sunIcon : moonIcon}
              alt=""
            />
          </span>
        </span>
      </button>

      <section className="search-panel" aria-labelledby="page-title">
        <header className="search-header">
          <img className="github-logo" src={githubLogo} alt="GitHub" />
          <h1 id="page-title" className="page-title">
            <span>Perfil</span>
            <img className="github-word" src={githubWord} alt="GitHub" />
          </h1>
        </header>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Digite um usuário do Github"
            aria-label="Digite um usuário do Github"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <button className="search-button" type="submit" aria-label="Buscar perfil">
            <img className="search-icon" src={searchIcon} alt="" />
          </button>
        </form>

        <div className="search-result">
          {loading && <p className="loading-message">Carregando...</p>}
          {error && (
            <p className="error-message">
              Nenhum perfil foi encontrado com esse nome de usuário.
              <br />
              Tente novamente
            </p>
          )}
          {user && (
            <article className="user-info">
              <img src={user.avatar_url} alt={`Foto de ${user.name || user.login}`} className="user-avatar" />
              <div>
                <h2>{user.name || user.login}</h2>
                <p>{user.bio || 'Esse perfil não possui bio'}</p>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default App