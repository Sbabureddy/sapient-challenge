import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      query: "",
      selectedPlatform: "",
      scoreAsce: false,
      scoreDsce: false,
    };
  }

  scoreAsce = () => {
    this.setState({ scoreAsce: true });
  };

  scoreDsce = () => {
    this.setState({ scoreDsce: true });
  };

  updateQuary = (quary) => {
    this.setState({ query: quary.trim(), selectedPlatform: "" });
  };

  updatePlatform = (e) => {
    this.setState({ query: "", selectedPlatform: e.target.value });
  };

  clearQuery = () => {
    this.setState({ query: "", selectedPlatform: "" });
  };

  componentDidMount() {
    fetch("http://starlord.hackerearth.com/gamesext")
      .then((res) => res.json())
      .then((data) => this.setState({ games: data }));
  }

  render() {
    const { games, query, selectedPlatform, scoreAsce, scoreDsce } = this.state;

    let showingGames;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingGames = games.filter((game) => match.test(game.title));
    } else if (selectedPlatform) {
      const match = new RegExp(escapeRegExp(selectedPlatform), "i");
      showingGames = games.filter((game) => match.test(game.platform));
    } else {
      showingGames = games;
    }

    let platforms = showingGames.map((game) => game.platform);
    platforms = [...new Set(platforms)];

    platforms.sort();

    if (scoreAsce) {
      showingGames.sort(sortBy("score"));
    }
    if (scoreDsce) {
      showingGames.sort(sortBy("-score"));
    }

    showingGames.sort(sortBy("title"));

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
            <div className="form-group">
              <select
                value={selectedPlatform}
                onChange={this.updatePlatform}
                className="form-control mb-1"
              >
                <option value="None">None</option>
                {platforms.map((platform) => (
                  <option value={platform} key={platform}>
                    {platform}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={this.scoreAsce}>
                <svg
                  className="bi bi-arrow-up"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={this.scoreDsce}
              >
                <svg
                  className="bi bi-arrow-down"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              {showingGames.length !== games.length && (
                <div>
                  <span>
                    Now showing {showingGames.length} of {games.length}
                  </span>
                  <button
                    onClick={this.clearQuery}
                    className="btn btn-secondary"
                  >
                    Show all
                  </button>
                </div>
              )}
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
