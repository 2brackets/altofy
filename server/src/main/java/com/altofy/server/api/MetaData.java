package com.altofy.server.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MetaData {
    private int page;
    private int pages;
    private int size;
    private int next;
    private int total;

    public int getNext() {
        return (page + 1 < pages) ? page + 1 : -1;
    }

    public MetaData(int page, int pages, int size, int total) {
        this.page = page;
        this.pages = pages;
        this.size = size;
        this.total = total;
    }
}
