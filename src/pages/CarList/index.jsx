import React, {useState} from 'react';
import styles from './CarList.module.css'
import axios from 'axios'

const CarList = ({ cars, setCars }) => {
  
const [selectedCar, setSelectedCar] = useState({
  id: null,
  modelo: "",
  placa: "",
  entrada: "",
  saida: "",
  valor: "",
});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedCar({ ...selectedCar, [name]: value });
  };
  
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (selectedCar.id) {
        // Se o carro já existir
        const updatedCar = {
          ...selectedCar,
          entrada: new Date(),
        };

        response = await axios.put(
          `http://localhost:3001/cars/${selectedCar.id}`,
          updatedCar
        );
        setCars((prevCars) =>
          prevCars.map((prevCar) =>
            prevCar.id === response.data.id ? response.data : prevCar
          )
        );
      } else {
        // Se o carro ainda não existe
        const newCar = {
          modelo: selectedCar.modelo,
          placa: selectedCar.placa,
          entrada: new Date(),
          saida: "",
          valor: "",
        };

        response = await axios.post("http://localhost:3001/cars", newCar);
        setCars((prevCars) => [...prevCars, response.data]);
      }

      setSelectedCar({
        id: null,
        modelo: "",
        placa: "",
        entrada: "",
        saida: "",
        valor: "",
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleExitDate = async (car) => {

  try {
    const saida = new Date();
    const dataEntrada = new Date(car.entrada)
    const diffMinutos = Math.ceil((saida - dataEntrada) / (1000 * 60));
    let valor = 0;

    if (!isNaN(diffMinutos)) {
      if (diffMinutos <= 5) {
        valor = 0;
      } else if (diffMinutos <= 60) {
        valor = 30;
      } else {
        const diffHoras = Math.floor((diffMinutos - 60) / 60);
        const diffMinutosAdicionais = diffMinutos - 60 - diffHoras * 60;
        valor = 30 + 3 * diffHoras;
        if (diffMinutosAdicionais > 0) {
          valor += 3;
        }
      }
    }

    const updatedCar = {
      ...car,
      saida,
      valor: `R$ ${valor.toFixed(2)}`,
    };

    const response = await axios.put(
      `http://localhost:3001/cars/${car.id}`,
      updatedCar
    );

    setCars((prevCars) =>
      prevCars.map((prevCar) =>
        prevCar.id === response.data.id ? response.data : prevCar
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  const handleDelete =async(id) => {
    try {
      await axios.delete(`http://localhost:3001/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (id) => {
    const selectedCar = cars.find((i) => i.id === id);
    setSelectedCar(selectedCar);
  };

 
  return (
    <div className={styles.carlist__container}>
      <div className={styles.carlist__form}>
        <h2>Adicionar Veículo:</h2>
        <form onSubmit={handleAdd}>
          <div className={styles.carlist__input__container}>
            <label>Modelo:</label>
            <input
              type="text"
              name="modelo"
              required
              placeholder="Digite o modelo do veículo"
              onChange={handleInputChange}
              value={selectedCar?.modelo ?? ""}
            />
          </div>
          <div className={styles.carlist__input__container}>
            <label>Placa:</label>
            <input
              type="text"
              name="placa"
              required
              placeholder="Digite a placa do veículo"
              onChange={handleInputChange}
              value={selectedCar?.placa ?? ""}
            />
          </div>

          <div className={styles.carlist__btn__container}>
            <button className={styles.carlist__btn__cancel__container}>
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.carlist__btn__send__container}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className={styles.carlist__table__container}>
        <div className={styles.carlist__table}>
          <h2>Veículos Estacionados</h2>
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Total R$</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.modelo}</td>
                  <td>{car.placa}</td>
                  <td>
                    {car.entrada
                      .toLocaleString("pt-br")
                      .replace(
                        /(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/,
                        "$1/$2/$3 - $4:$5"
                      )}
                  </td>
                  <td>{car.saida.toLocaleString("pt-br").replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$1/$2/$3 - $4:$5') ? car.saida.toLocaleString("pt-br").replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$1/$2/$3 - $4:$5') : " "}</td>
                  <td>{car.valor}</td>
                  <td>
                    <div className={styles.table__btn__container}>
                      <button
                        className={styles.table__btn__edit}
                        onClick={() => handleEdit(car.id)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.table__btn__cancel}
                        onClick={() => handleDelete(car.id)}
                      >
                        Excluir
                      </button>
                      <button
                        className={styles.table__btn__finaly}
                        onClick={() => handleExitDate(car)}
                      >
                        Finalizar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CarList;
