package com.ctc.obligatorio2dda.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import com.ctc.obligatorio2dda.entity.Cliente;
import com.ctc.obligatorio2dda.service.ClienteServiceImpl;

@CrossOrigin
@Controller
@RestController
@RequestMapping("api")
public class ClienteController{
    @Autowired
    private ClienteServiceImpl clienteServiceImpl;

    @PostMapping(value = "/agregarcliente")
    public ResponseEntity<?> create(@RequestBody Cliente cliente) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteServiceImpl.save(cliente));
        } catch (Exception e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/modificarcliente/{id}")
    public ResponseEntity<Cliente> update(@PathVariable("id") Long id, @RequestBody Cliente cliente) {
        Optional<Cliente> clienteData = clienteServiceImpl.findById(id);

        if (clienteData.isPresent()) {
            Cliente _cliente = clienteData.get();
            _cliente.setNombre(cliente.getNombre());
            _cliente.setApellido(cliente.getApellido());
            _cliente.setCI(cliente.getCI());
            _cliente.setEmail(cliente.getEmail());
            return new ResponseEntity<>(clienteServiceImpl.save(_cliente), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/borrarcliente/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id) {
        try {
            clienteServiceImpl.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> read(@PathVariable(value = "id") Long clienteId) {
        Optional<Cliente> unCliente = clienteServiceImpl.findById(clienteId);
        if (!unCliente.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(unCliente);
    }

    @GetMapping("/clientes")
    public List<Cliente> readAll() {
        List<Cliente> clientes = StreamSupport
                .stream(clienteServiceImpl.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return clientes;
    }
}