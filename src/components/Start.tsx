import styles from '../scss/start.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Start = () => {
  const [isStarted, setIsStarted] = useState<boolean>(true)
  const navigate = useNavigate()

  const handleStartClick = () => {
    setIsStarted(false)
  }

  useEffect(() => {
    return () => {
      setIsStarted(true)
    }
  }, [])

  const lightOff = async () => {
    await axios.post('http://82.202.169.113/api/devices/params', {
      id: 1,
      parentId: 1,
      params: { power: false },
    })
    return
  }

  const handleLanguageClick = (path: string) => {
    lightOff()
    navigate(path)
  }

  return (
    <div className={styles.container}>
      {isStarted ? (
        <button className={`btn ${styles.btn}`} onClick={handleStartClick}>
          Начать
        </button>
      ) : (
        <div className={styles.desc_container}>
          <span>Выберите язык программирования</span>
          <div className={styles.btn_container}>
            <button
              className={`btn ${styles.btn}`}
              onClick={() => handleLanguageClick('/kotlin')}
            >
              Kotlin
            </button>
            <button
              className={`btn ${styles.btn}`}
              onClick={() => handleLanguageClick('/go')}
            >
              Go
            </button>
            <button
              className={`btn ${styles.btn}`}
              onClick={() => handleLanguageClick('/type-script')}
            >
              TypeScript
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Start
