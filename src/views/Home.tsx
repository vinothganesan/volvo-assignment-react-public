import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { View, TabNav, TabNavItem, Spacer, Flex, Text } from "vcc-ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as ChevronCircle } from "../icons/chevron-circled.svg";
import { ReactComponent as ChevronSmall } from "../icons/chevron-small.svg";
import "./Home.css";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

const Home = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const customSlider = useRef<Slider>(null);
  const settings = {
    slidesToShow: filterData.length < 4 ? filterData.length : 4,
    dots: false,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: filterData.length < 4 ? filterData.length : 4,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    fetch("./api/cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilterData(data);
      })
      .catch((e) => console.log("Error:", e));
  }, []);

  const renderFilter = () => {
    const carType = [...new Set(data.map((car: Car) => car.bodyType))];
    return (
      <View
        extend={{
          maxWidth: "100vw",
        }}
      >
        <TabNav enableLineTransition>
          <TabNavItem
            key={'ALL'}
            onClick={() => carSelected('All Cars')}
            isActive={true}
          >
            ALL
          </TabNavItem>
          {carType.map((item: string) => {
            return (
              <TabNavItem
                key={item}
                onClick={() => carSelected(item)}
              >
                {item.toUpperCase()}
              </TabNavItem>
            );
          })}
        </TabNav>
        <Spacer size={5} />
      </View>
    );
  };

  const carSelected = (bodyType: any) => {
    const cars = [...data];
    const filteredCars: any = cars
      .map((i: Car) => (bodyType === i.bodyType ? i : null))
      .filter((i: any) => i !== null);

    if (filteredCars.length) {
      setFilterData(filteredCars);
    } else {
      setFilterData(cars);
    }
  };

  return (
    <main>
      <Flex extend={{ padding: 16 }} className="Home">
        {renderFilter()}
        <Slider ref={customSlider} {...settings} >
          {filterData.map((i: Car) => (
            <Flex key={i.id} extend={{ width: "351px" }} >
              <Flex className="car-detail" aria-hidden="true" tabIndex={-1} >
                <Text subStyle="emphasis" extend={{ color: "#808c98" }}>
                  {i.bodyType.toUpperCase()}
                </Text>
                <Flex className="model-name-type">
                  <Text subStyle="emphasis" extend={{ paddingRight: "10px" }}>
                    {i.modelName}
                  </Text>
                  <Text subStyle="emphasis" extend={{ color: "#808c98" }}>
                    {i.modelType}
                  </Text>
                </Flex>
              </Flex>
              <img src={i.imageUrl} alt="car display" className="car-img" />
              <div className="links">
                <a href={`/learn:${i.id}`}>
                  <Text subStyle="emphasis" extend={{ color: "#337ac0" }}>
                    Learn <ChevronSmall className="chevron-small" />
                  </Text>
                </a>
                <a href={`/shop:${i.id}`}>
                  <Text subStyle="emphasis" extend={{ color: "#337ac0" }}>
                    Shop <ChevronSmall className="chevron-small" />
                  </Text>
                </a>
              </div>
            </Flex>
          ))}
        </Slider>
        <Flex className="button-nav">
          <button
            aria-label="previous"
            onClick={() => customSlider?.current?.slickPrev()}
          >
            <ChevronCircle className="button-prev" />
          </button>
          <button
            aria-label="previous"
            onClick={() => customSlider?.current?.slickNext()}
          >
            <ChevronCircle className="button-next" />
          </button>
        </Flex>
      </Flex>
    </main>
  );
};

export default React.memo(Home);
