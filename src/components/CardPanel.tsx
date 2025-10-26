"use client";

import React, { useReducer, useState } from "react";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "./Card";

// Mock venue data
const venues = [
  {
    vid: "001",
    name: "The Bloom Pavilion",
    imgSrc: "/img/bloom.jpg",
  },
  {
    vid: "002",
    name: "Spark Space",
    imgSrc: "/img/sparkspace.jpg",
  },
  {
    vid: "003",
    name: "The Grand Table",
    imgSrc: "/img/grandtable.jpg",
  },
];

type State = Map<string, number>;
type Action = { type: "SET_RATING"; venue: string; rating: number };

function reducer(state: State, action: Action): State {
  const newState = new Map(state);
  if (action.type === "SET_RATING") {
    newState.set(action.venue, action.rating);
  }
  return newState;
}

const initialState: State = new Map(venues.map((v) => [v.name, 0]));

const CardPanel: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hiddenSummary, setHiddenSummary] = useState<Set<string>>(new Set());

  const handleRatingChange = (venueName: string, newValue: number) => {
    dispatch({ type: "SET_RATING", venue: venueName, rating: newValue });
    setHiddenSummary((prev) => {
      if (prev.has(venueName)) {
        const newSet = new Set(prev);
        newSet.delete(venueName);
        return newSet;
      }
      return prev;
    });
  };

  const handleRemoveFromSummary = (venue: string) => {
    setHiddenSummary((prev) => {
      const newSet = new Set(prev);
      newSet.add(venue);
      return newSet;
    });
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} className="flex flex-wrap justify-center gap-6 p-5">
        {venues.map((venue) => (
          <Box key={venue.vid} sx={{ width: 300, mb: 2 }}>
            <Link href={`/venue/${venue.vid}`} style={{ textDecoration: "none" }}>
              <Card
                key={venue.name}
                venueName={venue.name}
                imgSrc={venue.imgSrc}
                ratingValue={state.get(venue.name) ?? 0}
                onRatingChange={handleRatingChange}
              />
            </Link>
          </Box>
          
        ))}
      </Stack>
      <Box mt={4} className="p-5 align-center">
        <h2>Summary</h2>
        <ul>
          {venues
            .filter((venue) => !hiddenSummary.has(venue.name))
            .map((venue) => (
              <li
                key={venue.name}
                data-testid={venue.name}
                style={{ cursor: "pointer", marginBottom: 8 }}
                onClick={() => handleRemoveFromSummary(venue.name)}
              >
                {venue.name}: {state.get(venue.name) ?? 0}
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default CardPanel;