import { useState } from "react";
import { postCollection } from "../lib/collection";
import { PlayerProperties } from "../types";
import { useFetchCollections } from "./useFetchCollection";

export const useCreatePlayer = (setRetrigger) => {

  const [submitting, setSubmitting] = useState(false);
  const [error, seterror] = useState(false);
  const [showPopup, setshowPopup] = useState(false);

  const { fetchPlayer } = useFetchCollections();

  const submitPlayer = (values: PlayerProperties, { resetForm }) => {
    try {
      setSubmitting(true);
      postCollection(values).then(() => {
        seterror(false);
        resetForm();
        fetchPlayer();
        setshowPopup(false);
        setRetrigger(true);
      })
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      seterror(true);
    }
  };

  return { submitPlayer, submitting, error, showPopup, setshowPopup }

}