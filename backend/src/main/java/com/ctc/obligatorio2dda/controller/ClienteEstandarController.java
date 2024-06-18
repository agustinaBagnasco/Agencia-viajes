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

import com.ctc.obligatorio2dda.entity.ClienteEstandar;

import com.ctc.obligatorio2dda.service.ClienteEstandarServiceImpl;

@CrossOrigin
@Controller
@RestController
@RequestMapping("api")
public class ClienteEstandarController{
    @Autowired
    private ClienteEstandarServiceImpl clienteEstandarServiceImpl;

    @PostMapping(value = "/agregarclienteestandar")
    public ResponseEntity<?> createClienteEstandar(@RequestBody ClienteEstandar cliente) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteEstandarServiceImpl.save(cliente));
        } catch (Exception e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/modificarclienteestandar/{id}")
    public ResponseEntity<ClienteEstandar> updateClienteEstandar(@PathVariable("id") Long id, @RequestBody ClienteEstandar cliente) {
        Optional<ClienteEstandar> clienteData = clienteEstandarServiceImpl.findById(id);

        if (clienteData.isPresent()) {
            ClienteEstandar _cliente = clienteData.get();
            _cliente.setNombre(cliente.getNombre());
            _cliente.setApellido(cliente.getApellido());
            _cliente.setCI(cliente.getCI());
            _cliente.setEmail(cliente.getEmail());
            _cliente.setTipo(cliente.getTipo());
            return new ResponseEntity<>(clienteEstandarServiceImpl.save(_cliente), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/borrarclienteestandar/{id}")
    public ResponseEntity<HttpStatus> deleteClienteEstandar(@PathVariable Long id) {
        try {
            clienteEstandarServiceImpl.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/clientesestandar/{id}")
    public ResponseEntity<?> readClienteEstandar(@PathVariable(value = "id") Long clienteId) {
        Optional<ClienteEstandar> unClienteEstandar = clienteEstandarServiceImpl.findById(clienteId);
        if (!unClienteEstandar.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(unClienteEstandar);
    }

    @GetMapping("/clientesestandar")
    public List<ClienteEstandar> readAllClienteEstandar() {
        List<ClienteEstandar> clientes = StreamSupport
                .stream(clienteEstandarServiceImpl.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return clientes;
    }
}