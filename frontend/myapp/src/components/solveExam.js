import { Select } from "antd";
import CoursePage from "./CoursePage";

const { Option } = Select;

const SolveExamWrapper = () => {
  return (
    <CoursePage>
      <SolveExam />
    </CoursePage>
  );
};

const SolveExam = () => {
  const solve = async () => {
    document.getElementById("correct").style({ fontColor: "green" });
    document.getElementById("false").style({ fontColor: "red" });
  };

  return (
    <div>
      <div
        centered="true"
        className="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 5 }}>
          <u> Question 1:</u>
        </h2>

        <div className="container">
          <h4>What's your name?</h4>
          <ol type="A">
            <li id="correct">Dina</li>
            <li id="false">Farida</li>
            <li id="false">Jana</li>
            <li id="false">Habiba</li>
          </ol>

          <div className="inline fields">
            <label>Choose an answer: </label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency" id="correct1"></input>
                <label>A</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>B</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>C</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>D</label>
              </div>
            </div>
          </div>

          {/* <div className="ui blue animated button" style = {{marginLeft: 510, marginBottom: 5}}>
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div> */}
          {/* </div> */}
        </div>
      </div>
      <div
        centered="true"
        className="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 5 }}>
          <u> Question 2:</u>
        </h2>

        <div className="container">
          <h4>WHow old are you?</h4>
          <ol type="A">
            <li>34</li>
            <li>22</li>
            <li>2</li>
            <li>13</li>
          </ol>

          <div className="inline fields">
            <label>Choose an answer: </label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequencyy" id="correct1"></input>
                <label>A</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequencyy"></input>
                <label>B</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequencyy"></input>
                <label>C</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequencyy"></input>
                <label>D</label>
              </div>
            </div>
          </div>

          {/* <div className="ui blue animated button" style = {{marginLeft: 510, marginBottom: 5}}>
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div>
</div> */}
        </div>
      </div>

      <div
        centered="true"
        className="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 5 }}>
          <u> Question 3:</u>
        </h2>

        <div className="container">
          <h4>hii???</h4>
          <ol type="A">
            <li>bye</li>
            <li>hi</li>
            <li>byee</li>
            <li>hii</li>
          </ol>

          <div className="inline fields">
            <label>Choose an answer: </label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency" id="correct1"></input>
                <label>A</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>B</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>C</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>D</label>
              </div>
            </div>
          </div>

          {/* <div className="ui blue animated button" style = {{marginLeft: 510, marginBottom: 5}}>
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div>
</div> */}
        </div>
      </div>

      <div
        centered="true"
        className="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 5 }}>
          <u> Question 4:</u>
        </h2>

        <div className="container">
          <h4>how is uni?</h4>
          <ol type="A">
            <li>ya3</li>
            <li>araf</li>
            <li>ya33</li>
            <li>arafff</li>
          </ol>

          <div className="inline fields">
            <label>Choose an answer: </label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency" id="correct1"></input>
                <label>A</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>B</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>C</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="frequency"></input>
                <label>D</label>
              </div>
            </div>
          </div>

          {/* <div className="ui blue animated button" style = {{marginLeft: 510, marginBottom: 5}}>
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div>
</div> */}
        </div>
      </div>

      <button
        className="ui blue primary button"
        style={{ marginLeft: 650, marginBottom: 10 }}
        onClick={solve}
      >
        Submit exam
      </button>
    </div>
  );
};

export default SolveExamWrapper;
