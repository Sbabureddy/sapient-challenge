import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      query: "",
    };
  }

  updateQuary = (quary) => {
    this.setState({ query: quary.trim() });
  };

  clearQuary = () => {
    this.setState({ query: "" });
  };

  componentDidMount() {
    fetch("http://starlord.hackerearth.com/gamesext")
      .then((res) => res.json())
      .then((data) => this.setState({ games: data }));
  }

  render() {
    const { games, query } = this.state;

    let showingGames;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingGames = games.filter((game) => match.test(game.title));
    } else {
      showingGames = games;
    }

    showingGames.sort(sortBy("score"));

    return (
      <div>
        <div>
          <form>
            <div className="form-group">
              <input
                type="search"
                name="search"
                id="search"
                className="form-control"
                placeholder="Search Game By Name"
                value={query}
                onChange={(event) => this.updateQuary(event.target.value)}
              />
            </div>
          </form>
        </div>
        <ol>
          {showingGames.map((game, idx) => (
            <li key={idx} className="list-unstyled">
              <div className="card shadow mb-3">
                <div className="card-body">
                  <p>
                    Title:
                    {game.title}
                  </p>
                  <p>
                    Platform:
                    {game.platform}
                  </p>
                  <p>
                    Score:
                    {game.score}
                  </p>
                  <p>
                    Genre:
                    {game.genre}
                  </p>
                  <p>
                    Editors Choice:
                    {game.editors_choice}
                  </p>
                  <p>
                    Release Year:
                    {game.release_year}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
