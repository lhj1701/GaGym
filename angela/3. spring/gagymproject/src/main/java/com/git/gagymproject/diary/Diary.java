package com.git.gagymproject.diary;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Diary {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(columnDefinition = "VARCHAR(1000)")
	
	private long diaryCreateTime;
	@Column(columnDefinition = "TEXT")
	private String diaryMorning;
	private String diaryLunch;
	private String diaryDinner;
	private String diaryRoutine;
	private String diaryRequest;
	private String trainerName;
	private String trainerFeedback;	
}
