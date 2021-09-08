import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from "../../../actions/products/productActions";

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Modal, TextField, Button } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer',
    },inputMaterial: {
        width: '100%',
    },
}));

export const TableProducts = () => {

    
    const dispatch = useDispatch();
    const articles = useSelector((state : any) => state.articles);
    console.log(articles);
    const styles = useStyle();
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        name: '',
        gender: '',
        stock: '',
        price: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(productoSeleccionado);
    };

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    
    const seleccionarProduct=(product, caso)=>{
        setProductoSeleccionado(product);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }

    useEffect(() => {
        dispatch(getArticles(undefined,  undefined, undefined, undefined,  undefined, undefined))
    }, [dispatch]);
    
    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Productos</h3>
            <TextField name= "name" className={styles.inputMaterial} label="Name" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.name} />
            <br />
            <TextField name= "gender" className={styles.inputMaterial} label="Gender" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.gender} />
            <br />
            <TextField name= "stock" className={styles.inputMaterial} label="Stock" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.stock} />
            <br />
            <TextField name= "price" className={styles.inputMaterial} label="Price" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.price} />
            <br />
            <br />
            <div>
                <Button color="primary">Editar</Button>
                <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el producto <b>{productoSeleccionado && productoSeleccionado.name}</b> ? </p>
          <div>
            <Button color="secondary">Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )

    return (    
        <>  
            <MaterialTable
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Gender", field: "gender" },
                    { title: "Stock", field: "stock", type: "numeric" },
                    { title: "Price", field: "price", type: "numeric" },

                ]}
                data={articles}
                title="Listado de productos"
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Producto',
                      onClick: (event, rowData) => seleccionarProduct(rowData, "Editar")
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Artista',
                      onClick: (event, rowData) => seleccionarProduct(rowData, "Eliminar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                localization={{
                    header:{
                      actions: "Actions"
                    }
                }}
        />
            {/* <TableContainer>
                <Table>
                    <TableHead>
                       <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Genero</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow> 
                    </TableHead>
                    <TableBody>
                        {
                            articles.map((p) => {
                                return (
                                    <TableRow>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>
                                            <Edit className={styles.iconos} onClick={()=>seleccionarProduct(p, 'Editar')}/>
                                            &nbsp;&nbsp;&nbsp;
                                            <Delete className={styles.iconos} onClick={()=>seleccionarProduct(p, 'Eliminar')} />
                                        </TableCell>
                                    </TableRow>
                                ) 
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer> */}

            <Modal 
                open= {modalEditar}
                onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                    {bodyEliminar}
            </Modal>

        </>
    );
}
