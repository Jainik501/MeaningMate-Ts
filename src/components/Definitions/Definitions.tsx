import React from "react";
import "./Definitions.css";

// Define the types for the objects in the response data
interface Phonetic {
  audio: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
}

interface Meaning {
  meanings: {
    definitions: Definition[];
  }[];
  phonetics?: Phonetic[]; // phonetics is optional here
}

interface MeaningProps {
  meanings: Meaning[];
  word: string;
  LightTheme: boolean;
  category: string;
}

const Definitions: React.FC<MeaningProps> = ({ meanings, word, LightTheme, category }) => {
  return (
    <div className="meanings">
      {/* audio---------------------------- */}
      {meanings[0] && word && category === "en" && meanings[0].phonetics && meanings[0].phonetics[0]?.audio && (
        <audio
          style={{ backgroundColor: "#fff", borderRadius: 10 }}
          src={meanings[0].phonetics[0].audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
      {/* audio---------------------------- */}

      {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def, index) => (
              <div
                key={index} // Added a key to help with rendering in React
                className="singleMean"
                style={{
                  backgroundColor: LightTheme ? "#3b5360" : "white",
                  color: LightTheme ? "white" : "black",
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms :</b> {def.synonyms.join(", ")} {/* Join synonyms with a comma */}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
