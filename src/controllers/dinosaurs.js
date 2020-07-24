import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Dinosaurs } from "../models/dinosaurs.js";

const getDinosaurs = (params, response) => {
  response.body = {
    success: true,
    data: Dinosaurs,
  };
};

const getDinosaur =  (params, response ) => {
  const selectedDino = Dinosaurs.find((dino) =>
    dino.id === params.id
  );
  if (selectedDino) {
    response.status = 200;
    response.body = {
      success: true,
      data: selectedDino,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Dinosaur Not Found",
    };
  }
};

const addDinosaur = async (request, response ) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const { value: dinosaurBody } = await request.body();
    const dinosaur = dinosaurBody;
    dinosaur.id = v4.generate();
    Dinosaurs.push(dinosaur);
    response.status = 201;
    response.body = {
      success: true,
      data: dinosaur,
    };
  }
};

const deleteDinosaur = ( params, response ) => {
  const filteredDinosaurs = Dinosaurs.filter(
    (dinosaur) => (dinosaur.id !== params.id),
  );
  if (filteredDinosaurs.length === Dinosaurs.length) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Not found",
    };
  } else {
    Dinosaurs.splice(0, Dinosaurs.length);
    Dinosaurs.push(...filteredDinosaurs);
    response.status = 200;
    response.body = {
      success: true,
      msg: `Dinosaur with id ${params.id} has been deleted`,
    };
  }
};

const updateDinosaur = async ( params, request, response ) => {
  const requestedDinosaur = Dinosaurs.find(
    (dinosaur) => dinosaur.id === params.id,
  );
  if (requestedDinosaur) {
    const { value: updatedDinosaurBody } = await request.body();
    const updatedDinosaurs= Dinosaurs.map(
      (dinosaur) => {
        if (dinosaur.id === params.id) {
          return {
            ...dinosaur,
            ...updatedDinosaurBody,
          };
        } else {
          return dinosaur;
        }
      },
    );

    Dinosaurs.splice(0, Dinosaurs.length);
    Dinosaurs.push(...updatedDinosaurs);
    response.status = 200;
    response.body = {
      success: true,
      msg: `Dinosaur id ${params.id} updated`,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Not Found`,
    };
  }
};

export {
  updateDinosaur,
  deleteDinosaur,
  getDinosaurs,
  getDinosaur,
  addDinosaur,
};
