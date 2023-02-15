import { AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper} from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../http"
import IRestaurante from "../../interfaces/IRestaurante"

import { Link as RouterLink } from 'react-router-dom'

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if(parametros.id) {
            http.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (
        <>
        
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1}}>
                        <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ mt: 2, color: "white"}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ mt: 2, color: "white"}}>
                                    Novo Restaurantes
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box> 
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        
                        {/* Conteudo da pagina */}

                    </Paper>
                </Container>
            </Box>

            <Box sx={{ display: 'flex', flexDirection:"column", alignItems:"center", flexGrow: 1 }}>
                <Typography component="h1" variant="h6"> Formulário de Restaurantes </Typography>
                <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                    <TextField 
                        value={nomeRestaurante} 
                        onChange={ evento => setNomeRestaurante(evento.target.value) } 
                        label="Nome do Restaurante" 
                        variant="standard" 
                        fullWidth
                        required
                    />

                    <Button sx={{ marginTop:2 }} type="submit" variant="outlined" fullWidth >Salvar</Button>
                </Box>
            </Box>

        </>
    )
}

export default FormularioRestaurante