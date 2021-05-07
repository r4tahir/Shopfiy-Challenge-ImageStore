
import React , {useState} from "react";
import Unsplash, { toJson } from "unsplash-js";
import {Button} from 'react-bootstrap';

const unsplash = new Unsplash({
  accessKey: "gmRpJoZ6Ao7vpZ3h3ZDSzwjLZqJpeKGNo_aFSG6VjwI",
});

export default function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const [showResult, setShowResult] = useState(true);
//Console Log to test if Query has gone through
    console.log(query);
	

//Function that uses the API to generate the Photos
    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
        .photos(query, 1, 30)
        .then(toJson)
        .then((json) => {
        setPics(json.results);
        console.log(json);
        });
//Console Log to show when the form has been submitted to the API
    console.log("Submitting the Form")
  };

    const onClick = () => {
        setShowResult(false);
    }

  return (
    <>

        {showResult ? <h2>Account Balance : $5 </h2> : <h2> Account Balance : $0 (Now in Viewing Mode)</h2>}

	<form className="form" onSubmit={searchPhotos}>


        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
	  value={query}
   	  onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

        {showResult ? <h4> Images Purchased : 0 ($5 Each)</h4> : <h4>Images Purchased : 1 </h4> }

      <div className="card-list">
      	{
	pics.map((pic) => <div className="card" key={pic.id}>

        {showResult ?
<Button button={true} variant="light" onClick={onClick}>
            <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="100%"
                height="100%"
              ></img>

</Button> :
            <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="100%"
                height="100%"
                brightness="0%"
            ></img> }



    </div> )
	};

	</div>
    </>
  );
}
