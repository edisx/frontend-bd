import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import {
  addColorToMesh,
  updateColor,
  deleteColor,
} from "../../features/modelSlice";
import { fetchSingleProductForAdmin } from "../../features/productSlice";
import { useParams } from "react-router-dom";

const MeshTree = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");
  const [isEditMode, setEditMode] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);
  

  const colorInputRef = useRef(null);

  const handleColorCircleClick = () => {
    colorInputRef.current.click();
  };

  const handleMeshClick = (mesh) => {
    setSelectedMesh(mesh);
    setModalOpen(true);
    setEditMode(false);
  };

  const handleColorClick = (colorId, colorName, colorHex) => {
    setSelectedColorId(colorId);
    setColorName(colorName);
    setHexCode(colorHex);
    setModalOpen(true);
    setEditMode(true);
  };

  const handleCloseModal = () => {
    setSelectedMesh(null);
    setModalOpen(false);
    setColorName("");
    setHexCode("#000000");

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colorData = {
      color_name: colorName,
      hex_code: hexCode,
    };
    if (isEditMode) {
      dispatch(updateColor({ pk: selectedColorId, colorData }));
    } else {
      dispatch(addColorToMesh({ mesh_id: selectedMesh.id, ...colorData }));
    }
    dispatch(fetchSingleProductForAdmin(id));
    setColorName("");
    setHexCode("#000000");
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(deleteColor(selectedColorId));
    dispatch(fetchSingleProductForAdmin(id));
    handleCloseModal();
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Meshes</h2>
      <div className="">
        {props.meshes.map((mesh) => (
          <div key={mesh.id} className="pb-2 mb-2">
            <div
              className="flex flex-row text-white bg-blue-500 rounded p-2 cursor-pointer"
              onClick={() => handleMeshClick(mesh)}
            >
              <div className="font-semibold">{mesh.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {mesh.colors.map((color) => (
                <div
                  key={color.id}
                  className="flex items-center bg-gray-100 rounded p-2 cursor-pointer"
                  onClick={() =>
                    handleColorClick(color.id, color.color_name, color.hex_code)
                  }
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.hex_code }}
                  ></div>
                  <div className="ml-2">{color.color_name}</div>
                  <div className="ml-2 text-gray-500">{color.hex_code}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="">
        <div className="p-4">
          <h2 className="text-2xl mb-4">
            {isEditMode ? "Edit Color" : `Add Color to ${selectedMesh?.name}`}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="colorName"
                className="block text-sm font-medium text-gray-600"
              >
                Color Name
              </label>
              <input
                id="colorName"
                type="text"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="mt-1 p-2 w-full rounded border"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="hexCode"
                className="block text-sm font-medium text-gray-600"
              >
                Color
              </label>
              <input
                ref={colorInputRef}
                id="hexCode"
                type="color"
                value={hexCode}
                onChange={(e) => setHexCode(e.target.value)}
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              />
              <div
                className="w-8 h-8 mt-1 rounded-full border cursor-pointer"
                style={{ backgroundColor: hexCode }}
                onClick={handleColorCircleClick}
              ></div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              {isEditMode ? "Update Color" : "Add Color"}
            </button>
          </form>
          {isEditMode && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-4 py-2 mt-4"
            >
              Delete Color
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MeshTree;
