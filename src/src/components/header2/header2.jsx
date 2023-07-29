import React, { useState } from 'react'
import styles from './header2.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faBell, faEllipsis, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Header2 = ({ sideView, setSideView }) => {
  const [threeDot, setThreeDot] = useState(false)
  return (
    <div className={styles.headerMainWrapper}>

      <div className={`${sideView ? styles.headerWrapperMax : styles.headerWrapperMin}`}>
        {/* halde sidebar button */}
        <button onClick={() => setSideView(!sideView)} className={styles.handleSideBarButtonWrapper}>
          {/* {sideView?'close':"open"} */}
          <FontAwesomeIcon icon={faArrowLeftLong} className={`${sideView ? styles.handleSideBarButtonMax : styles.handleSideBarButtonMin}`} />
        </button>

        {/* notification icon */}
        <div className='d-flex align-items-center'>
          {/* Search start */}
          <div className={styles.headerSearchWrapper}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchSearchIcon} />
            <input type="text" placeholder='Search...' className={styles.HeaderSearch} />
          </div>
          {/* Search end */}


          {/* notification icon start */}
          {/* <div className={styles.notificationIconWrapper}>
            <FontAwesomeIcon icon={faBell} className={styles.noficationIcon} />
          </div> */}
          {/* notification end */}

          {/* three dot icon */}
          <div className={styles.threeDotWrapper} onClick={() => setThreeDot(!threeDot)}>
            <FontAwesomeIcon icon={faEllipsis} className={styles.threeDot} />
          </div>
          {/* Three dot start popup start */}
         {
          threeDot&&
          <div className={styles.threeDotOpen}>
          {/* <Link to="/admin/profile/"><div className={styles.threeDotProfileBtn}>profile</div></Link> */}
          {/* <hr className='py-0 my-0' /> */}
          <div className={styles.threeDotLogoutBtn}>logout</div>
        </div>
         }
          {/* Three dot start popup end */}
        </div>
      </div>
      {/* <div>button's</div> */}
    </div>
  )
}

export default Header2