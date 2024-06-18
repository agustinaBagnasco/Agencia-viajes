package com.ctc.obligatorio2dda.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "clientes_premium")
public class ClientePremium extends Cliente{
    public ClientePremium() {}

    public ClientePremium(Long pCI, String pNombre, String pApellido, String pEmail, String pTipo){
        super(pCI, pNombre, pApellido, pEmail, pTipo);
    }

    public static Double precioDescuento(Double pPrecio){
        return pPrecio * 0.80;
    }
}
