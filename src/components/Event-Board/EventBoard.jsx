import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// import ItemForm from "./Item-Form";
import "./EventBoard.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEventBoard, withEventBoard } from "../../contexts/EventBoardContext";

// data for this board is in App.js

const EventBoard = () => {
  // Form
  const [form, setForm] = useState({ visible: false, swim: null });

  const openForm = (swimId) => {
    console.log("clicked", swimId);
    setForm({ visible: true, swim: swimId });
  };

  console.log(form);
  // Initial data
  const { data } = useEventBoard();
  const [list, setList] = useState(data);

  // When event data gets updated, set the list state
  useEffect(() => {
    setList(data);
  }, [data]);

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
      return "item current";
    }
    return "item";
  };

  return (
    <Fragment>
      <h1>Board Title</h1>
      <div className="board-container">
        <div className="drag-n-drop scrollbar">
          {/* swim, and swim index => for each swimlane create swimlane
           */}
          {!!list?.length &&
            list.map((swim, swimI) => {
              return (
                // when there are no cards in the group...
                // if we are dragging, swimlane has no items -> add listener (dragEnter)
                // sent event, {swimIndex, and itemIndex default to zero (as there is no item yet)}
                <div
                  className="swimlane"
                  onDragEnter={dragging && !swim.items.length ? (e) => handleDragEnter(e, { swimI, itemI: 0 }) : null}
                  key={swim.swim_id}
                >
                  <div className="swim-title">{swim.swim_title}</div>
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
                        // className="item"
                        className={dragging ? getStyles({ swimI, itemI }) : "item"}
                        key={item.item_id}
                      >
                        <div className="item__container">
                          <p className="item__title">{item.item_title}</p>
                          <p className="item__desc">{item.item_content} </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="add-item-container">
                  <button onClick={(e) => openForm((e.target = swimI))}>
                    <FontAwesomeIcon icon={faPlus} className="add-item-button" />
                    {form.visible && form.swim === swimI ? <ItemForm /> : null}
                  </button>
                </div> */}
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

EventBoard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      swim_id: PropTypes.number,
      swim_title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.number,
          item_title: PropTypes.string,
          item_content: PropTypes.string,
        })
      ),
    })
  ),
};

export default withEventBoard(EventBoard);
