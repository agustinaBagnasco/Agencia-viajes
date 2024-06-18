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

import com.ctc.obligatorio2dda.entity.ClientePremium;
import com.ctc.obligatorio2dda.service.ClientePremiumServiceImpl;

@CrossOrigin
@Controller
@RestController
@RequestMapping("api")
public class ClientePremiumController {
    @Autowired
    private ClientePremiumServiceImpl clientePremiumServiceImpl;

    @PostMapping(value = "/agregarclientepremium")
    public ResponseEntity<?> createClientePremium(@RequestBody ClientePremium cliente) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(clientePremiumServiceImpl.save(cliente));
        } catch (Exception e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/modificarclientepremium/{id}")
    public ResponseEntity<ClientePremium> updateClientePremium(@PathVariable("id") Long id, @RequestBody ClientePremium cliente) {
        Optional<ClientePremium> clienteData = clientePremiumServiceImpl.findById(id);

        if (clienteData.isPresent()) {
            ClientePremium _cliente = clienteData.get();
            _cliente.setNombre(cliente.getNombre());
            _cliente.setApellido(cliente.getApellido());
            _cliente.setCI(cliente.getCI());
            _cliente.setEmail(cliente.getEmail());
            _cliente.setTipo(cliente.getTipo());
            return new ResponseEntity<>(clientePremiumServiceImpl.save(_cliente), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/borrarclientepremium/{id}")
    public ResponseEntity<HttpStatus> deleteClientePremium(@PathVariable Long id) {
        try {
            clientePremiumServiceImpl.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/clientespremium/{id}")
    public ResponseEntity<?> readClientePremium(@PathVariable(value = "id") Long clienteId) {
        Optional<ClientePremium> unClientePremium = clientePremiumServiceImpl.findById(clienteId);
        if (!unClientePremium.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(unClientePremium);
    }

    @GetMapping("/clientespremium")
    public List<ClientePremium> readAllClientePremium() {
        List<ClientePremium> clientes = StreamSupport
                .stream(clientePremiumServiceImpl.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return clientes;
    }
}
