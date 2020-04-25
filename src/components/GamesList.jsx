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
          </form>
        </div>
        <div className="form-group">
          <select
            value={selectedPlatform}
            onChange={this.updatePlatform}
            className="form-control"
          >
            <option value="None">None</option>
            {platforms.map((platform) => (
              <option value={platform} key={platform}>
                {platform}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={this.scoreAsce}>
            Score By Ascending Order
          </button>
          <button className="btn btn-secondary" onClick={this.scoreDsce}>
            Score By Dscending Order
          </button>
        </div>
        <div>
          {showingGames.length !== games.length && (
            <div>
              <span>
                Now showing {showingGames.length} of {games.length}
              </span>
              <button onClick={this.clearQuery} className="btn btn-secondary">
                Show all
              </button>
            </div>
          )}
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
