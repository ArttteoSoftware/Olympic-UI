import Card from '../../components/Card/Card'
import styles from './MainPageSportsGrid.module.css'
import { getAllMatches } from '../../services/MainPageService'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDividerColor } from '../../enum/Divider'

function MainPageSportsGrid() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)


  const loadData = useCallback(async () => {
    try {
      setLoader(true)
      const { data } = await getAllMatches()

      if (data) {
        setData(data.units)
        setLoader(false)
      }
    } catch (err) {
      setLoader(false)
      console.error('Error while loading Data', err)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className={styles.container}>
      {data.map((item) => {
        return (
          <motion.div
            key={item._id}
            onClick={() => {
              navigate(`/${item._id}`)
            }}
          >
            <Card
              divider={getDividerColor(item._id)}
              key={item._id}
              title={item._id}
              units={item.units}
              loader={loader}
            />
          </motion.div>
        )
      })}

    </div>
  )
}

export default MainPageSportsGrid
