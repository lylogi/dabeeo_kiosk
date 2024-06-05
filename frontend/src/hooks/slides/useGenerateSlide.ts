import { useEffect, useState } from "react";

const filterSlideData = async (dataFilter: [], numberPerSlide: number) => {
  let dataSlide: never[][] = [];
  if (dataFilter.length > numberPerSlide) {
    while (dataFilter.length > numberPerSlide) {
      const slide = dataFilter.splice(0, numberPerSlide);
      dataSlide.push(slide);
    }

    dataSlide.push(dataFilter);

    return dataSlide;
  }
}

export const convertDataToSlide = (data: [], numberPerSlide: number) => {
  const [filteredData, setFilteredData] = useState([[]]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let dataFilter = JSON.parse(JSON.stringify(data));

    if (!dataFilter || dataFilter && dataFilter.length <= numberPerSlide) {
      setFilteredData([dataFilter]);
      setIsLoading(false);
    } else {
      const filterData = async () => {
        // Add your filtering logic here
        // For example, filtering data based on a specific condition
        const filteredResult = await filterSlideData(dataFilter, numberPerSlide);
        setFilteredData(filteredResult);
        setIsLoading(false);
      };
      filterData();
    }
  }, [data, numberPerSlide])

  return [filteredData, isLoading];
}
