import React, { Component, useEffect, useState } from 'react';
import $ from 'jquery';

import '../stylesheets/FormView.css';

function FormView() {
  const [ question, setQuestion ] = useState('')
  const [ answer, setAnswer ] = useState('')
  const [ difficulty, setDifficulty ] = useState(1)
  const [ category, setCategory] = useState(1)
  const [ categories, setCategories] = useState({})


  useEffect( () => {
    $.ajax({
      url: `/categories`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        setCategories( result.categories )
        return;
      },
      error: (error) => {
        alert('Unable to load categories. Please try your request again')
        return;
      }
    })
  });


  const submitQuestion = (event) => {
    event.preventDefault();
    $.ajax({
      url: '/questions', //TODO: update request URL
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        question: question,
        answer: answer,
        difficulty: difficulty,
        category: category
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-question-form").reset();
        return;
      },
      error: (error) => {
        alert('Unable to add question. Please try your request again')
        return;
      }
    })
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({[name]: value})
  // }

    return (
      <div id="add-form">
        <h2>Add a New Trivia Question</h2>
        <form className="form-view" id="add-question-form" onSubmit={submitQuestion}>
          <label>
            Question
            <input type="text" name="question" onChange={(e)=> setQuestion(e.target.value)}/>
          </label>
          <label>
            Answer
            <input type="text" name="answer" onChange={(e)=> setAnswer(e.target.value)}/>
          </label>
          <label>
            Difficulty
            <select name="difficulty" onChange={(e)=> setDifficulty(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" onChange={(e)=> setCategory(e.target.value)}>
              {Object.keys(categories).map(id => {
                  return (
                    <option key={id} value={id}>{categories[id]}</option>
                  )
                })}
            </select>
          </label>
          <input type="submit" className="button" value="Submit" />
        </form>
      </div>
    );
}

export default FormView;
