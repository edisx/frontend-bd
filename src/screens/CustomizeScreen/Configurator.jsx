import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../features/colorSlice";

const Configurator = () => {
  const dispatch = useDispatch();
  // Getting the meshes from the Redux state
  const meshes = useSelector((state) => state.products.product.meshes);

  // State to hold the selected mesh
  const [selectedMesh, setSelectedMesh] = useState(null);

  // State to hold the selected color for the mesh
  const [selectedColor, setSelectedColor] = useState(null);

  // Effect to set the default selected mesh when meshes are loaded
  useEffect(() => {
    if (meshes && meshes.length > 0) {
      setSelectedMesh(meshes[0]);
    }
  }, [meshes]);

  return (
    <div className="w-screen relative">
      {/* List of mesh names */}
      {meshes && (
        <div>
          {meshes.map((mesh) => (
            <button
              key={mesh.id}
              onClick={() => setSelectedMesh(mesh)}
              style={{
                backgroundColor: selectedMesh?.id === mesh.id ? "#ddd" : "",
              }}
            >
              {mesh.name}
            </button>
          ))}
        </div>
      )}

      {/* List of colors for the selected mesh */}
      {selectedMesh && (
        <div>
          {selectedMesh.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => {
                setSelectedColor(color);
                // Dispatch the setColor action with the mesh ID and selected color
                dispatch(setColor({ meshId: selectedMesh.id, color: color }));
              }}
              style={{ backgroundColor: color.hex_code }}
            >
              {color.color_name}
            </button>
          ))}
        </div>
      )}

      {/* Display the selected mesh and color */}
      <div>
        <p>Selected Mesh: {selectedMesh?.name}</p>
        <p>Selected Color: {selectedColor?.color_name}</p>
      </div>
    </div>
  );
};

export default Configurator;
