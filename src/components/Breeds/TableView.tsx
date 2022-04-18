import React from "react";
import ImageLightbox from "../ImageLightbox";
import {
  View,
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

import { columns } from "./helper/config";

const BreedsView = ({ loading, filtered, density, idxBase }: TableProps) => {
  return (
    <View gridArea="content">
      <TableView
        aria-label="List of images to apply filters to"
        width="100%"
        height="100%"
        overflowMode="wrap"
        density={density}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              width={column.width}
              allowsSorting={column.key === "filename"}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody loadingState={loading}>
          {!filtered.length && 
            <Row>
              {(key) => {
                if (key === "url") {
                  return <Cell>{'Breeds search got no results ...'}</Cell>;
                } else {
                  return <Cell>{''}</Cell>;
                }
              }}
            </Row>
          }
          {filtered.map((item: any, idx: number) => {
            const row = item.breeds[0];
            return (
              <Row key={`${row.id}-${idxBase + idx}`}>
                {(key) => {
                  if (key === "url") {
                    return (
                      <Cell>
                        <ImageLightbox pic={row["url"]} />
                        <span className="piclabel">pic # {idx++}</span>
                      </Cell>
                    );
                  } else if (key === "name") {
                    return (
                      <Cell>
                        <div
                          style={{ margin: "20px 0 0 20px", height: "250px" }}
                        >
                          <p
                            style={{
                              color: "rgb(0, 128, 255, 0.8)",
                              fontSize: "18px",
                            }}
                          >
                            {row["name"]}
                          </p>
                          <strong>Height: </strong>
                          {row["height1"]}
                          <br />
                          <strong>Weight: </strong>
                          {row["weight1"]}
                          <br />
                          <strong>Life span: </strong>
                          {row["life_span"]}
                          <br />
                          <strong>Breed Group: </strong>
                          {row["breed_group"]}
                          <br />
                          <strong>Breed for: </strong>
                          {row["bred_for"]}
                          <br />
                          <strong>Temperament: </strong>
                          {row["temperament"]}
                          <br />
                        </div>
                      </Cell>
                    );
                  } else {
                    return <Cell>{''}</Cell>;
                  }
                }}
              </Row>
            );
          })}
        </TableBody>
      </TableView>
    </View>
  );
};

export default BreedsView;

interface TableProps {
  filtered: any;
  tableDensity: string;
  idxBase: number;
}
