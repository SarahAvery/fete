import React, { Fragment, useState, useRef } from "react";
// import PropTypes from "prop-types";
import "./EventBoard.scss";

// data for this board is in App.js

export default function EventBoard({ data }) {
  const [list, setList] = useState(data);

  // are we currently dragging the item?
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();

  const dragNode = useRef();

  // drag event
  // useRef keeps stays constant between renders
  // event drag event, we save the coordiantes to the current (useRef)
  const handleDragStart = (e, params) => {
    console.log("drag starting...", params);
    dragItem.current = params;

    // need to add an event listener to the current event
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("entering drag..", params);
    const currItem = dragItem.current;

    // if the node is not equal to the current target
    if (e.target !== dragNode.current) {
      console.log("target is not the same");
      setList((oldList) => {
        // deep copy
        let newList = JSON.parse(JSON.stringify(oldList));
        // splice -> if we take our params.itemI at zero
        // make sure same group
        // remove current item from current swimIndex
        newList[params.swimI].items.splice(params.itemI, 0, newList[currItem.swimI].items.splice(currItem.itemI, 1)[0]);

        // the current item is not longer the current item, it is not the target item
        dragItem.current = params;

        // console.log("newList ", newList);
        // newList[]
        return newList;
      });
    }
  };

  // clean up dragStart
  const handleDragEnd = () => {
    console.log("ending drag");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    // get the current item
    const currItem = dragItem.current;
    // if current swimIndex = params swimIndex, & current itemIndex = params itemIndex, return className
    if (currItem.swimI === params.swimI && currItem.itemI === params.itemI) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  return (
    <Fragment>
      <h1>Board Title</h1>
      <div className="board-container">
        <div className="drag-n-drop scrollbar">
          {/* swim, and swim index => for each swimlane create dnd-group*/}
          {list.map((swim, swimI) => {
            return (
              // when there are no cards in the group...
              // if we are dragging, swimlane has no items -> add listener (dragEnter)
              // sent event, {swimIndex, and itemIndex default to zero (as there is no item yet)}
              <div
                className="dnd-group "
                onDragEnter={dragging && !swim.items.length ? (e) => handleDragEnter(e, { swimI, itemI: 0 }) : null}
                key={swim.swim_id}
              >
                <div className="dnd-title">{swim.swim_title}</div>
                {/* item, itemIndex => inside the swimlane, iterate through all our items */}
                {swim.items.map((item, itemI) => {
                  return (
                    // pass the event, swimIndex and itemIndex (coordinates [0,0])
                    <div
                      draggable
                      onDragStart={(e) => {
                        handleDragStart(e, { swimI, itemI });
                      }}
                      onDragEnter={
                        dragging
                          ? (e) => {
                              handleDragEnter(e, { swimI, itemI });
                            }
                          : null
                      }
                      // className="dnd-item"
                      className={dragging ? getStyles({ swimI, itemI }) : "dnd-item"}
                      key={item.item_id}
                    >
                      <div className="dnd-item__container">
                        <p className="dnd-item__title">{item.item_title}</p>
                        <p className="dnd-item__desc">{item.item_content} </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

EventBoard.propTypes = {};

// Props
// board title
// swimlane title
// item title
// item content

/* group = swimlane 
           <div className="dnd-group">
            <div className="dnd-title">to-do</div>
            {/* item = item  */
/* <div className="dnd-item">
              <div className="dnd-item__container">
                <p className="dnd-item__title">Item Title</p>
                <p className="dnd-item__desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.
                </p>
              </div>
            </div>
            <div className="dnd-item">
              <div className="dnd-item__container">
                <p className="dnd-item__title">Item Title</p>
                <p className="dnd-item__desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.
                </p>
              </div>
            </div>
          </div>  */
