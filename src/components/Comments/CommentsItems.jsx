import React, { useState } from "react"
import style from "./Comments.module.css"

const CommentsItems = ({ comment, color }) => {
    return (
        <li className={style.listItem}  >
            {color.includes("#") ? 
            <div className={style.colorWrapper} style={{ backgroundColor: color }} ></div>
            :<div className={style.colorWrapper} style={{ backgroundColor: "black" }} ></div>}
            {comment ? comment : <p>Loading...</p>}

        </li>

    )
}

export default CommentsItems;