import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../features/colorSlice";
import { ChevronLeft, ChevronRight } from "react-feather";

const Configurator = () => {
  const dispatch = useDispatch();
  const meshes = useSelector((state) => state.products.product.meshes) || [];

  const colors = useSelector((state) => state.colors);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (meshes && meshes.length > 0) {
      setSelectedMesh(meshes[0]);
    }
  }, [meshes]);

  // Helper function to navigate between meshes
  const navigateMeshes = (direction) => {
    if (!meshes || meshes.length === 0 || !selectedMesh) return;
    const currentIndex = meshes.findIndex(
      (mesh) => mesh.id === selectedMesh.id
    );
    if (currentIndex === -1) return; // If selectedMesh is not in meshes, exit
    const nextIndex =
      (currentIndex + direction + meshes.length) % meshes.length;
    setSelectedMesh(meshes[nextIndex]);
  };

  const isColorSelected = (color) => {
    // Check if this color is in the selected colors state
    return colors.some(
      (selectedColor) =>
        selectedColor.meshId === selectedMesh.id &&
        selectedColor.color.id === color.id
    );
  };

  const selectedMeshIndex = selectedMesh
    ? meshes.findIndex((mesh) => mesh.id === selectedMesh.id)
    : -1;

  const totalMeshes = meshes.length;

  return (
    <div className="w-screen">
      {/* upper */}
      <div className="flex justify-center items-center p-4">
        <button onClick={() => navigateMeshes(-1)}>
          {/* Replace with left arrow icon */}
          <ChevronLeft />
        </button>
        <div className="flex justify-center items-center min-w-[200px]">
          <span>{selectedMesh?.name}</span>
          <span className="mx-2"></span>
          {/* Dynamic text for mesh count */}
          <span>
            {selectedMeshIndex !== -1
              ? `${selectedMeshIndex + 1}/${totalMeshes}`
              : ""}
          </span>
        </div>
        <button onClick={() => navigateMeshes(1)}>
          {/* Replace with right arrow icon */}
          <ChevronRight />
        </button>
      </div>
      {/* lower */}
      <div className="flex justify-center space-x-4 p-4">
        {selectedMesh?.colors.map((color) => (
          <div key={color.id} className="text-center">
            <div
              onClick={() => {
                setSelectedColor(color);
                dispatch(setColor({ meshId: selectedMesh.id, color: color }));
              }}
              className={`w-20 h-20 rounded-full ${
                isColorSelected(color) ? "bg-gray-200" : "bg-transparent"
              } flex items-center justify-center`}
            >
              <div
                className={`w-16 h-16 rounded-full ${
                  isColorSelected(color) ? "border-2 border-white" : ""
                }`}
                style={{ backgroundColor: color.hex_code }}
              ></div>
            </div>
            <div className="mt-2">{color.color_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configurator;
