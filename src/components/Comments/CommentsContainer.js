import React, { useEffect, useState } from "react";
import style from "./Comments.module.css"
import CommentsItems from "./CommentsItems";

const CommentsContainer = ({ commentInfo, valueOfInputs, changeInputValue, addComment }) => {
    const [ arrayOfComments, setArrayOfComments ] = useState(null)
    useEffect(() => {
        // create array of commponents
        if(commentInfo && commentInfo[0]){
            let commentsArray = commentInfo[0].comment;
            setArrayOfComments([...commentsArray].map((item,index)=>{
                let comment = item
                if(item.split(" ")[0].includes("#")){
                    // if first item have "#" in word if was color and we remove it in all comment
                    comment = item.replace(item.split(" ")[0], "");
                }
                return <CommentsItems color={item.split(" ")[0]} comment={comment} key={index} />
            }))
        }
        
    }, [commentInfo])
    return (
        <div className={style.wrapper} >
            <div className={style.secondWrapper} >
                <h1>Comments</h1>
                <ul>
                    {arrayOfComments}
                </ul>
                <form className={style.formItem} onSubmit={(e)=>{e.preventDefault()}}>
                    <input onChange={changeInputValue} value={valueOfInputs.color} name="color" type="color" />
                    <textarea placeholder="Type your comment..." onChange={changeInputValue} value={valueOfInputs.comments} name="comments" ></textarea>
                    <button onClick={addComment} >Add Comment</button>
                </form>
            </div>
        </div>
    )
}


export default CommentsContainer;