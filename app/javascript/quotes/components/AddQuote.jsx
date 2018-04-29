import React from 'react';
import { Link } from 'react-router-dom';

const AddQuote = (props) => (
    <div className="add-quote">
        <div>
        <input type="text" ref={props.textRef} placeholder="Quote.." value={props.quote} onChange={props.textChange}/>
        <br />
        <input type="text" ref={props.authorRef} placeholder="Author.." value={props.author} onChange={props.authorChange}/>
        <br />
        <button className="submit" onClick={props.submit}>Create</button>
        <button className="submit" onClick={props.cancel}>Cancel</button>
    </div>
  </div>
)

export default AddQuote