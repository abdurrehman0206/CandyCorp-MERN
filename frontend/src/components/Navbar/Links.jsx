import React, { useState } from 'react'
import {AiOutlineCaretDown,AiOutlineShoppingCart,AiOutlineHeart,AiOutlineCaretUp} from 'react-icons/ai'
function Links({name,dd_links,className="",dd_menu=false}) {
  const [showMenu,setShowMenu]=useState(false)
  return (
    <div className={className?className:""}>
        <div>
          <p>{name}</p>
        {dd_menu &&  <button onClick={()=>setShowMenu(!showMenu)} > {showMenu?<AiOutlineCaretUp />:<AiOutlineCaretDown />} </button>} 
        </div>

        {dd_menu &&  <div className={`dropdown-wrapper ${showMenu?'show-menu':'hide-menu'}`}>

        <div className="dropdown">
          <ul className="dropdown-content">

            {
              dd_links.map((link)=>(
                              <li key={link.name}>{link.name}</li>
                            ))
            }

          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Links