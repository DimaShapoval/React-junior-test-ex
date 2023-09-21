import React, { useState } from "react"
import style from "./Items.module.css"

const Items = ({ itemName, countOfComments, itemId, itemClass, activeItem, removeItem }) => {
    return (
            <li className={itemClass} data-index={itemId} onClick={activeItem} >
            {itemName}
            <div className={style.rightSide} >
                <span className={style.count} >{countOfComments}</span>
                <button onClick={removeItem} data-index={itemId}>Delete</button>
            </div>

        </li>
        
    )
}

export default Items;