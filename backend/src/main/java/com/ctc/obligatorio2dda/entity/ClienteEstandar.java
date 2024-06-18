package com.ctc.obligatorio2dda.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "clientes_estandar")
public class ClienteEstandar extends Cliente{
    public ClienteEstandar() {}

    public ClienteEstandar(Long pCI, String pNombre, String pApellido, String pEmail, String pTipo){
        super(pCI, pNombre, pApellido, pEmail, pTipo);
    }
}