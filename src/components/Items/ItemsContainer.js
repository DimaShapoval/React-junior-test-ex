import React, { useEffect, useState } from "react";
import style from "./Items.module.css"
import Items from "./Items";

const ItemsContainer = ({ inputValue, inputChange, itemsInfo, addItem, removeItem, changeActiveId }) => {
    const [arrayOfItems, setArrayOfItems] = useState(null)
    const [activeItemId, setActiveItemId] = useState(0)
    useEffect(() => {
        if (itemsInfo) {
            // create array of components
            setArrayOfItems([...itemsInfo].map((item, index) => {
                let itemClassName = `${style.listItem}`
                if (index === activeItemId) {
                    itemClassName = `${style.listItem} ${style.activeItem}`;
                }
                return <Items key={index} removeItem={(e)=>{
                    removeItem(e);
                    setActiveItemId(0)
                }} itemId={index} activeItem={activeItem} itemClass={itemClassName} itemName={item.name} countOfComments={[...item.comment].length} />
            }))
        }

    }, [itemsInfo])
    const activeItem = (e) => {
        // if index of item same that item witch clicked we add active class and remove of another items
        let elem = e.currentTarget;
        setArrayOfItems([...itemsInfo].map((item, index) => {
            let itemClassName = `${style.listItem}`
            if (index === Number(elem.dataset.index)) {
                itemClassName = `${style.listItem} ${style.activeItem}`;
            }
            return <Items key={index} removeItem={(e)=>{
                removeItem(e);
                setActiveItemId(0)
            }} activeItem={activeItem} itemId={index} itemClass={itemClassName} itemName={item.name} countOfComments={[...item.comment].length} />
        }))
        changeActiveId(Number(elem.dataset.index))
        setActiveItemId(Number(elem.dataset.index))

    }
    return (
        <div className={style.wrapper} >
            <div className={style.secondWrapper} >
                <h1>Items</h1>
                <form className={style.formItem} onSubmit={(e) => e.preventDefault()} >
                    <div className={style.fromInputWrapper} >
                        <input type="text" autoComplete="off" value={inputValue} onChange={inputChange} name="nameOfItem" placeholder="Type item name here..." />
                        <button onClick={addItem} >Add item</button>
                    </div>
                    <ul>
                        {itemsInfo ? arrayOfItems : <p>Loading..</p>}
                    </ul>
                </form>
            </div>
        </div>
    )
}


export default ItemsContainer;