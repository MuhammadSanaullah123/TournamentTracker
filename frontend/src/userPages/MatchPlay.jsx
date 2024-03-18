import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
//components
import StandingsTable from "../components/StandingsTable";
import CustomComponents from "../components/CustomComponents";
//mui
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
//api
import {
  useGetAllPlayersByIdMutation,
  useGetTourMaxMatchPlayMutation,
  useGetTourStandingsMutation,
} from "../slices/tournamentApiSlice";
//reducer
import {
  setTournament,
  setMatchPlay,
  setStandings,
} from "../slices/tournamentSlice";
//others
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";
const MatchPlay = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  let cookiesColors = cookies.get("colors");
  let cookiesFontSize = cookies.get("fontSize");

  const dispatch = useDispatch();
  const [arenas, setArenas] = useState();
  const [matchPlayData, setMatchPlayData] = useState();
  const [standingsData, setStandingsData] = useState();

  const [getTournament] = useGetAllPlayersByIdMutation();
  const [getMaxMatch] = useGetTourMaxMatchPlayMutation();
  const [getStandings] = useGetTourStandingsMutation();
  const { tournamentInfo } = useSelector((state) => state.tournament);

  console.log("tournamentInfo", tournamentInfo);
  const getTourData = async () => {
    try {
      sessionStorage.setItem("token", "true");
      const id = window.location.pathname.split("/")[2];
      const res = await getTournament(id).unwrap();
      setArenas(res.data.arenas);
      dispatch(setTournament(res.data));
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };
  const getMatchPlay = async () => {
    try {
      sessionStorage.setItem("token", "true");
      const id = window.location.pathname.split("/")[2];
      const res = await getMaxMatch(id).unwrap();
      console.log(res);
      setMatchPlayData(res);
      dispatch(setMatchPlay({ ...res }));
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };
  const getStandingsData = async () => {
    try {
      sessionStorage.setItem("token", "true");
      const id = window.location.pathname.split("/")[2];
      const res = await getStandings(id).unwrap();
      setStandingsData(res);
      console.log(res);
      dispatch(setStandings({ ...res }));
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };
  const handleExtractPlayerId = () => {
    let updatedArenas = arenas?.map((arena) => {
      const matchingGame = matchPlayData?.games.find(
        (game) => game.arenaId == arena.arenaId
      );
      if (matchingGame) {
        const matchingPlayers = matchingGame.playerIds.map((playerId) => {
          const matchingPlayer = tournamentInfo?.players.find(
            (player) => player.playerId === playerId
          );
          return matchingPlayer?.name || "No Visualizer";
        });
        return {
          ...arena,
          playerIds: matchingGame.playerIds,
          playerNames: matchingPlayers,
        };
      }

      return arena;
    });
    setArenas(updatedArenas);
    console.log("updatedArenas", updatedArenas);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isMounted, setIsMounted] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTourData();
      await getMatchPlay();
      await getStandingsData();
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    handleExtractPlayerId();
  }, [matchPlayData]);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted && cookiesColors) {
      if (cookiesColors.boxHeader) {
        const boxHeaderElement = document.getElementById("boxHeader");
        if (boxHeaderElement) {
          boxHeaderElement.style.backgroundColor = cookiesColors.boxHeader;
        }
      }
      if (cookiesColors.box) {
        const boxElement = document.getElementById("box");
        if (boxElement) {
          boxElement.style.backgroundColor = cookiesColors.box;
        }
      }
      if (cookiesColors.mainHeading) {
        const mainHeading = document.querySelectorAll("#matchplay h2");
        if (mainHeading[0]) {
          mainHeading[0].style.color = cookiesColors.mainHeading;
        }
      }
      if (cookiesColors.subHeading) {
        const subHeading = document.querySelectorAll("#boxHeader p");
        if (subHeading[0]) {
          subHeading[0].style.color = cookiesColors.subHeading;
        }
      }
      if (cookiesColors.bodyText) {
        const bodyText = document.querySelectorAll("#box .matchplayDiv1p2");
        if (bodyText[0]) {
          bodyText[0].style.color = cookiesColors.bodyText;
        }
      }
    }
  }, [cookiesColors, isMounted]);

  useEffect(() => {
    if (isMounted) {
      //boxHeader
      const boxHeaderElement = document.getElementById("boxHeader");
      if (boxHeaderElement) {
        localStorage.setItem(
          "boxHeaderColor",
          getComputedStyle(boxHeaderElement).backgroundColor
        );
      }

      //box
      const boxElement = document.getElementById("box");
      if (boxElement) {
        localStorage.setItem(
          "boxColor",
          getComputedStyle(boxElement).backgroundColor
        );
      }
      //mainHeading
      const mainHeading = document.querySelectorAll("#matchplay h2");
      if (mainHeading[0]) {
        localStorage.setItem(
          "mainHeadingColor",
          getComputedStyle(mainHeading[0]).color
        );
      }
      //subHeading
      const subHeading = document.querySelectorAll("#boxHeader p");
      if (subHeading[0]) {
        localStorage.setItem(
          "subHeadingColor",
          getComputedStyle(subHeading[0]).color
        );
      }
      //bodyText
      const bodyText = document.querySelectorAll("#box .matchplayDiv1p2");
      if (bodyText[0]) {
        localStorage.setItem(
          "bodyTextColor",
          getComputedStyle(bodyText[0]).color
        );
      }
    }
  }, [isMounted, standingsData]);

  return (
    <div id="matchplay">
      <div className="headerDiv">
        <h2
          style={{
            color:
              cookiesColors && cookiesColors.mainHeading
                ? cookiesColors.mainHeading
                : "",
            fontSize:
              cookiesFontSize && cookiesFontSize.mainHeading
                ? `${cookiesFontSize.mainHeading}px`
                : "",
          }}
        >
          Matchplay Results Visualizer
        </h2>
        {/*   <i
          className="fa-solid fa-gear"
          onClick={() => navigate("/personalization")}
        ></i> */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="customModal">
            <i className="fa-solid fa-xmark" onClick={handleClose}></i>
            {/*  <CustomComponents /> */}
          </Box>
        </Modal>
      </div>
      <div className="matchplayDiv">
        {arenas ? (
          <>
            {" "}
            <div className="matchplayDiv1">
              {arenas?.map((arena, index) => (
                <div
                  className="matchplayDiv1SmallDiv"
                  key={index}
                  id="box"
                  style={{
                    backgroundColor:
                      cookiesColors && cookiesColors.box
                        ? cookiesColors.box
                        : "",
                  }}
                >
                  <div
                    id="boxHeader"
                    style={{
                      backgroundColor:
                        cookiesColors && cookiesColors.boxHeader
                          ? cookiesColors.boxHeader
                          : "",
                    }}
                  >
                    <p
                      className="matchplayDiv1p1"
                      style={{
                        color:
                          cookiesColors && cookiesColors.subHeading
                            ? cookiesColors.subHeading
                            : "",
                        fontSize:
                          cookiesFontSize && cookiesFontSize.subHeading
                            ? `${cookiesFontSize.subHeading}px`
                            : "",
                      }}
                    >
                      {arena.name}
                    </p>
                  </div>
                  <div className="hl"></div>
                  {arena?.playerNames ? (
                    arena?.playerNames?.map((name, index) => (
                      <p
                        className="matchplayDiv1p2"
                        key={index}
                        style={{
                          color:
                            cookiesColors && cookiesColors.bodyText
                              ? cookiesColors.bodyText
                              : "",
                          fontSize:
                            cookiesFontSize && cookiesFontSize.bodyText
                              ? `${cookiesFontSize.bodyText}px`
                              : "",
                        }}
                      >
                        {name}
                      </p>
                    ))
                  ) : (
                    <p
                      className="matchplayDiv1p2"
                      style={{
                        fontSize:
                          cookiesFontSize && cookiesFontSize.bodyText
                            ? `${cookiesFontSize.bodyText}px`
                            : "",
                      }}
                    >
                      No Visualizer
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="matchplayDiv2">
              <StandingsTable standings={standingsData} arenas={arenas} />
            </div>
          </>
        ) : (
          <div className="loaderDiv">
            <ClipLoader
              color="#fff"
              loading={true}
              /* cssOverride={override} */
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPlay;
