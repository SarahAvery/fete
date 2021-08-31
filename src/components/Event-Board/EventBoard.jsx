import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";
import "./EventBoard.scss";
import Swimlane from "./Swimlane";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEventBoard, withEventBoard } from "../../contexts/EventBoardContext";
import SwimlaneItem from "./SwimlaneItem";

let onLoad = false;

const EventBoard = () => {
  // Form
  const [form, setForm] = useState({ visible: false, swim: null });

  const openForm = (swimId) => {
    console.log("clicked", swimId);
    setForm({ visible: true, swim: swimId });
  };

  // Initial data
  const { data, updateSwimlanes, setEventBoardData } = useEventBoard();
  // const [swimlanes, setSwimlanes] = useState(data?.items);

  // When event data gets updated, set the list state
  // useEffect(() => {
  //   setSwimlanes(data?.items);
  // }, [data]);

  // are we currently dragging the item?
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  // clean up dragStart
  const handleDragEnd = React.useCallback(
    (evt) => {
      console.log("ending drag");
      setDragging(false);
      dragNode.current.removeEventListener("dragend", handleDragEnd);
      dragItem.current = null;
      dragNode.current = null;
    },
    [data.items]
  );

  useEffect(() => {
    if (!dragging && onLoad) {
      updateSwimlanes(data.items);
    }
    if (!onLoad) onLoad = true;
  }, [dragging, data.items, updateSwimlanes]);

  // drag event
  // useRef keeps stays constant between renders
  // event drag event, we save the coordiantes to the current (useRef)
  const handleDragStart = React.useCallback(
    (e, params) => {
      console.log("drag starting...", params);
      dragItem.current = params;

      // need to add an event listener to the current event
      dragNode.current = e.target;
      dragNode.current.addEventListener("dragend", handleDragEnd);
      setTimeout(() => {
        setDragging(true);
      }, 0);
    },
    [handleDragEnd]
  );

  // Need to update what swimlane the task is in
  const updateTasksOrderKeys = (swimlanes) => {
    return swimlanes.map((swimlane) => {
      const items = swimlane.items.map((task, index) => {
        if (task) task.order = index;
        return task;
      });
      swimlane.items = items;
      return swimlane;
    });
  };

  const handleDragEnter = (e, params) => {
    console.log("entering drag..", params);
    const currItem = dragItem.current;

    // if the node is not equal to the current target
    if (e.target !== dragNode.current) {
      console.log("target is not the same");
      setEventBoardData((oldList) => {
        // deep copy
        let newList = JSON.parse(JSON.stringify(oldList.items));
        // splice -> if we take our params.itemI at zero
        // make sure same group
        // remove current item from current swimIndex
        newList[params.swimI].items.splice(params.itemI, 0, newList[currItem.swimI].items.splice(currItem.itemI, 1)[0]);

        // the current item is not longer the current item, it is now the target item
        dragItem.current = params;

        // update the order keys on each task
        const newListWithOrderKeysModified = updateTasksOrderKeys(newList);

        return { ...oldList, items: newListWithOrderKeysModified };
      });
    }
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
      <h1>{data?.title}</h1>
      <div className="board-container">
        <div className="drag-n-drop scrollbar">
          {/* swim, and swim index => for each swimlane create swimlane
           */}
          {!!data.items?.length &&
            data.items.map((swim, swimI) => {
              return (
                // when there are no cards in the group...
                // if we are dragging, swimlane has no items -> add listener (dragEnter)
                // sent event, {swimIndex, and itemIndex default to zero (as there is no item yet)}
                <Swimlane
                  onDragEnter={dragging && !swim.items.length ? (e) => handleDragEnter(e, { swimI, itemI: 0 }) : null}
                  key={swim.id}
                  title={swim.title}
                >
                  {/* item, itemIndex => inside the swimlane, iterate through all our items */}
                  {swim.items.map((item, itemI) => {
                    return (
                      // pass the event, swimIndex and itemIndex (coordinates [0,0])
                      <SwimlaneItem
                        item={item}
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
                        className={dragging ? getStyles({ swimI, itemI }) : "item"}
                        key={item?.id || itemI}
                      />
                    );
                  })}

                  <div className="add-btn-container">
                    <div className="add-btn" onClick={(e) => openForm((e.target = swimI))}>
                      <FontAwesomeIcon icon={faPlus} className="add-item-button" />
                    </div>
                    {form.visible && form.swim === swimI ? <ItemForm columnId={swimI} /> : null}
                  </div>
                </Swimlane>
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
